const services = [
  'Консультации по оформлению документов на выезд на постоянное место жительства в Германию в качестве позднего переселенца, на основании свидетельства о гражданстве и по воссоединению семьи',
  'Консультации по оформлению документов на выезд в Германию по гостевому приглашению',
  'Помощь в оформлении документов для выезда по гостевому приглашению в Германию',
  'Перевод документов с немецкого языка на русский и с русского языка на немецкий с нотариальной заверкой подписи переводчика',
  'Курьерская доставка документов в Генеральное Консульство Германии в г. Алматы',
];

export default function About() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <span className="text-gold text-sm font-bold uppercase tracking-widest">О нас</span>
          <h1 className="text-3xl md:text-4xl font-black mt-2 max-w-2xl">
            Актюбинское областное общество немцев «Возрождение»
          </h1>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <p className="text-ink/80 leading-relaxed">
          Наше общество объединяет представителей немецкой диаспоры Актюбинской области.
          Мы сохраняем родной язык, культуру и традиции немецкого народа, поддерживаем
          связи поколений и развиваем сотрудничество с германскими организациями.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mt-8">
          <div className="border border-ink/10 rounded-xl p-5 bg-blue-light/30">
            <h3 className="font-black text-ink mb-2">Миссия</h3>
            <p className="text-sm text-ink/70">Сохранение языка и культурного наследия немцев Казахстана.</p>
          </div>
          <div className="border border-ink/10 rounded-xl p-5 bg-blue-light/30">
            <h3 className="font-black text-ink mb-2">Деятельность</h3>
            <p className="text-sm text-ink/70">Курсы языка, культурные мероприятия, социальная поддержка.</p>
          </div>
        </div>

        <h2 className="text-2xl font-black text-ink mt-12 mb-4">Услуги общества</h2>
        <p className="text-ink/70 mb-4">Общество оказывает ряд услуг:</p>
        <ol className="flex flex-col gap-3">
          {services.map((service, i) => (
            <li key={i} className="flex gap-3 border border-ink/10 rounded-xl p-4 bg-white">
              <span className="shrink-0 w-7 h-7 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <span className="text-sm text-ink/80 leading-relaxed">{service}</span>
            </li>
          ))}
        </ol>

        <div className="mt-8 border border-ink/10 rounded-xl p-5 bg-blue-light/30">
          <h3 className="font-black text-ink mb-1">По всем вопросам обращайтесь</h3>
          <p className="text-sm text-ink/70">г. Актобе, пр-т Абилкайыр-хана 28-78</p>
        </div>
      </section>
    </div>
  );
}