'use client';

import { useMemo, useState } from 'react';
import { Search, ClipboardCheck, LayoutDashboard, Settings, ChevronLeft, ChevronRight, SlidersHorizontal } from 'lucide-react';

const rows = [
  ['Проверка №1048','15.09.2026','Плановая','Иванов И.И.','Удовлетворено','94'],
  ['Проверка №1047','14.09.2026','Внеплановая','Петрова А.А.','Частично удовлетворено','76'],
  ['Проверка №1046','13.09.2026','Плановая','Сидоров С.С.','Не удовлетворено','48'],
  ['Проверка №1045','12.09.2026','Плановая','Кузнецова Е.В.','Удовлетворено','91'],
  ['Проверка №1044','11.09.2026','Внеплановая','Морозов Д.В.','Частично удовлетворено','69'],
  ['Проверка №1043','10.09.2026','Плановая','Орлова М.А.','Удовлетворено','88'],
  ['Проверка №1042','09.09.2026','Плановая','Волков А.С.','Не удовлетворено','42']
];

const statusClass = s => s === 'Удовлетворено' ? 'ok' : s === 'Частично удовлетворено' ? 'partial' : 'bad';

export default function Page() {
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState('Все статусы');
  const [type, setType] = useState('Все типы');
  const [view, setView] = useState('Таблица');

  const filtered = useMemo(() => rows.filter(r =>
    (status === 'Все статусы' || r[4] === status) &&
    (type === 'Все типы' || r[2] === type) &&
    r.join(' ').toLowerCase().includes(query.toLowerCase())
  ), [query, status, type]);

  return (
    <main className="shell">
      <aside className="sidebar">
        <div className="brand"><div className="brandIcon"><ClipboardCheck size={21}/></div><span>Контроль</span></div>
        <nav>
          <div className="navItem active"><LayoutDashboard size={18}/>Реестр проверок</div>
          <div className="navItem">План проверок</div>
          <div className="navItem">Результаты</div>
          <div className="navItem"><Settings size={18}/>Настройки</div>
        </nav>
        <div className="sidebarFoot">Система контроля<br/><span>Версия 2.4</span></div>
      </aside>

      <section className="content">
        <header className="header">
          <div><div className="eyebrow">КОНТРОЛЬ КАЧЕСТВА</div><h1>Реестр проверок</h1><p>Мониторинг и обработка результатов проверок</p></div>
          <button className="filterBtn"><SlidersHorizontal size={17}/> Настроить</button>
        </header>

        <div className="stats">
          <Stat label="Подано апелляций" value="57" />
          <Stat label="Удовлетворено" value="31" tone="ok" />
          <Stat label="Частично удовлетворено" value="18" tone="partial" />
          <Stat label="Не удовлетворено" value="8" tone="bad" />
        </div>

        <div className="toolbar">
          <div className="search"><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Поиск по реестру..."/></div>
          <select value={status} onChange={e=>setStatus(e.target.value)}><option>Все статусы</option><option>Удовлетворено</option><option>Частично удовлетворено</option><option>Не удовлетворено</option></select>
          <select value={type} onChange={e=>setType(e.target.value)}><option>Все типы</option><option>Плановая</option><option>Внеплановая</option></select>
          <select value={view} onChange={e=>setView(e.target.value)}><option>Таблица</option><option>Карточки</option></select>
        </div>

        {view === 'Таблица' ? <div className="tableWrap"><table><thead><tr><th>Проверка</th><th>Дата</th><th>Тип</th><th>Ответственный</th><th>Результат</th><th>Оценка</th></tr></thead><tbody>{filtered.map(r=><tr key={r[0]}><td className="strong">{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td><td><span className={'badge '+statusClass(r[4])}>{r[4]}</span></td><td className="score">{r[5]}</td></tr>)}</tbody></table><div className="pagination"><span>Показано {filtered.length} из {rows.length}</span><div><button><ChevronLeft size={16}/></button><button className="page">1</button><button><ChevronRight size={16}/></button></div></div></div> : <div className="cards">{filtered.map(r=><article key={r[0]}><div className="cardTop"><b>{r[0]}</b><span className={'badge '+statusClass(r[4])}>{r[4]}</span></div><p>{r[1]} · {r[2]}</p><p>{r[3]}</p><strong>Оценка {r[5]}</strong></article>)}</div>}
      </section>
    </main>
  );
}

function Stat({label,value,tone=''}) { return <div className="stat"><div className="statLabel">{label}</div><div className={'statValue '+tone}>{value}</div></div>; }