const items = [
  { title: 'Курсы немецкого языка', desc: 'Языковые курсы для всех возрастов и уровней подготовки.' },
  { title: 'Молодёжный клуб', desc: 'Встречи, мероприятия и обмены для молодёжи диаспоры.' },
  { title: 'Культура и традиции', desc: 'Праздники, фестивали и сохранение народных традиций.' },
  { title: 'Социальная работа', desc: 'Поддержка пожилых членов общества и нуждающихся семей.' },
];

export default function Activities() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <span className="text-gold text-sm font-bold uppercase tracking-widest">Направления</span>
          <h1 className="text-3xl md:text-4xl font-black mt-2">Деятельность</h1>
        </div>
      </section>
      <section className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.title} className="border border-ink/10 rounded-xl p-5 bg-white hover:shadow-md transition">
            <h3 className="font-black text-ink mb-2">{item.title}</h3>
            <p className="text-sm text-ink/70">{item.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}