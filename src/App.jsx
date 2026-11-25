import { useState, useRef } from 'react';
import BusinessDirectory from './components/business/BusinessDirectory';
import ReservationList from './components/booking/ReservationList';
import BookingForm from './components/booking/BookingForm';
import DashboardStats from './components/business/DashboardStats';
import HostForm from './components/business/HostForm';
import { businesses as seedBusinesses, reservations as seedReservations, users as seedUsers, services as seedServices, staff as seedStaff } from './data/mockData';
import './App.css';

export default function App() {
  const [businesses, setBusinesses] = useState(seedBusinesses);
  const [services, setServices] = useState(seedServices);
  const [staff, setStaff] = useState(seedStaff);
  const [reservations, setReservations] = useState(seedReservations);
  const [users, setUsers] = useState(seedUsers);
  const [profileName, setProfileName] = useState('');
  const [userId, setUserId] = useState('user_002');
  const [editBusinessId, setEditBusinessId] = useState(null);
  const [page, setPage] = useState('discover');
  const [selected, setSelected] = useState(null);
  const [editing, setEditing] = useState(null);
  const formRef = useRef(null);
  const owned = businesses.filter(b => b.ownerId === userId);
  const owns = r => owned.some(b => b.id === r.businessId);
  const mine = r => r.customerId === userId;
  const active = r => ['pending','confirmed'].includes(r.status);
  const business = businesses.find(b => b.id === selected);
  function close() { setSelected(null); setEditing(null); }
  function navigate(p) { close(); setEditBusinessId(null); setPage(p); }
  function select(id, reservation = null) {
    setPage('discover'); setSelected(id); setEditing(reservation);
    requestAnimationFrame(() => formRef.current?.scrollIntoView({behavior:'smooth'}));
  }
  function save(r) {
    if (r.customerId !== userId) return;
    setReservations(old => {
      const existing = old.find(x => x.id === r.id);
      if (existing && (!mine(existing) || !active(existing))) return old;
      return existing ? old.map(x => x.id === r.id ? r : x) : [...old,r];
    });
    navigate('mine');
  }
  function changeStatus(id,status) {
    setReservations(old => old.map(r => r.id === id && active(r) && (status === 'cancelled' ? mine(r) || owns(r) : owns(r) && r.status === 'pending') ? {...r,status} : r));
  }
  function edit(id) { const r = reservations.find(x => x.id === id && mine(x) && active(x)); if (r) select(r.businessId,r); }
  function createProfile(e) {
    e.preventDefault();
    const name = profileName.trim();
    if (!name) return;
    const id = crypto.randomUUID();
    setUsers(old => [...old, {id, name, role: 'customer', businessIds: []}]);
    setUserId(id); setProfileName(''); navigate('discover');
  }
  function create(b,s,people) { setUsers(old => old.map(u => u.id === userId ? {...u, role: 'business_owner', businessIds: [...(u.businessIds || []), b.id]} : u)); setBusinesses(old => [...old,{...b,ownerId:userId}]); setServices(old => [...old,...s]); setStaff(old => [...old,...people]); navigate('host'); }
  function updateBusiness(b,s,people) {
    if (!owned.some(x=>x.id===b.id)) return;
    setBusinesses(old=>old.map(x=>x.id===b.id?{...x,...b,ownerId:userId}:x));
    setServices(old=>[...old.map(x=>x.businessId===b.id?{...x,active:false}:x).filter(x=>!s.some(y=>y.id===x.id)),...s]);
    setStaff(old=>[...old.map(x=>x.businessId===b.id?{...x,active:false}:x).filter(x=>!people.some(y=>y.id===x.id)),...people]);
    navigate('host');
  }
  return <>
    <header className="app-header"><div className="header-inner"><button className="brand" onClick={() => navigate('discover')}><span className="brand-icon">A</span>Any<span>Reserve</span></button><nav>{[['discover','Открий'],['mine','Моите резервации'],['host','Моят бизнес']].map(([id,label]) => <button key={id} className={page===id?'nav-active':''} onClick={() => navigate(id)}>{label}</button>)}</nav><label className="profile">Профил<select value={userId} onChange={e => {if (e.target.value === 'new') {navigate('profile'); return;} setUserId(e.target.value);navigate('discover');}}>{users.map(u => <option key={u.id} value={u.id}>{u.name}{businesses.some(b => b.ownerId === u.id)?' · Бизнес':''}</option>)}<option value="new">+ Създай свой профил</option></select></label></div></header>
    <main>
      {page==='profile' && <section className="booking-panel"><div className="booking-heading"><div><h2>Създай свой профил</h2><p>Резервирай и управлявай бизнеси със собствено име.</p></div></div><form onSubmit={createProfile}><label>Име<input autoFocus required maxLength={80} value={profileName} onChange={e=>setProfileName(e.target.value)} placeholder="Твоето име"/></label><button className="booking-submit" disabled={!profileName.trim()}>Създай профил</button><button type="button" className="booking-close" onClick={()=>navigate('discover')}>Назад</button></form></section>}

      {page==='discover' && <><section className="hero"><div className="eyebrow">ANYRESERVE / РЕЗЕРВАЦИИ БЕЗ УСИЛИЕ</div><h1>Твоето време.<br/>Твоят избор.</h1><p>Открий услуги, избери удобен час и резервирай на едно място.</p><button onClick={() => navigate('create')}>+ Добави своя бизнес</button></section><BusinessDirectory businesses={businesses} onSelectBusiness={select}/>{business && <div ref={formRef}><BookingForm key={`${userId}-${editing?.id || business.id}`} business={business} services={services} staff={staff} reservations={reservations} customerId={userId} editingReservation={editing} onSave={save} onClose={close}/></div>}</>}
      {page==='mine' && <><div className="page-heading"><span className="eyebrow">ЛИЧЕН ПРОФИЛ</span><h1>Моите резервации</h1><p>Само резервациите, които ти си направил.</p></div><ReservationList reservations={reservations.filter(mine)} users={users} services={services} businesses={businesses} onEdit={edit} onCancel={id => changeStatus(id,'cancelled')}/></>}
      {page==='host' && <><div className="page-heading"><span className="eyebrow">УПРАВЛЕНИЕ</span><h1>Моят бизнес</h1><p>Управлявай своите обекти и получените резервации.</p><button className="primary" onClick={() => navigate('create')}>+ Нов бизнес</button></div><div className="host-grid">{owned.map(b => <article className="business-card" key={b.id}><h3>{b.name}</h3><p>{b.location.city}</p><p>{services.filter(s=>s.businessId===b.id && s.active).length} услуги</p><button className="primary" onClick={()=>{navigate('editBusiness');setEditBusinessId(b.id);}}>Редактирай бизнеса</button></article>)}</div><DashboardStats reservations={reservations.filter(owns)} /><ReservationList reservations={reservations.filter(owns)} users={users} services={services} businesses={businesses} onCancel={id=>changeStatus(id,'cancelled')} onApprove={id=>changeStatus(id,'confirmed')} onReject={id=>changeStatus(id,'rejected')}/></>}
      {page==='editBusiness' && owned.some(b=>b.id===editBusinessId) && <HostForm key={editBusinessId} initialBusiness={owned.find(b=>b.id===editBusinessId)} initialServices={services.filter(s=>s.businessId===editBusinessId && s.active)} initialStaff={staff.filter(s=>s.businessId===editBusinessId && s.active)} onCreate={updateBusiness} onClose={()=>navigate('host')}/>}
      {page==='create' && <HostForm onCreate={create} onClose={()=>navigate('host')}/>}
    </main><footer>AnyReserve · Учебен проект · Демо данни</footer>
  </>;
}
