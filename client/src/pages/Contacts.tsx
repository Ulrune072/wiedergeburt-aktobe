export default function Contacts() {
  return (
    <div>
      <section className="bg-navy text-white">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <span className="text-gold text-sm font-bold uppercase tracking-widest">Контакты</span>
          <h1 className="text-3xl md:text-4xl font-black mt-2">Свяжитесь с нами</h1>
        </div>
      </section>
      <section className="max-w-2xl mx-auto px-4 py-12 flex flex-col gap-4">
        <div className="border border-ink/10 rounded-xl p-5 bg-white">
          <h3 className="font-black text-ink mb-1">Адрес</h3>
          <p className="text-sm text-ink/70">г. Актобе, Казахстан</p>
          <p className="text-sm text-ink/70">пр-т Абилкайыр-хана 28-78</p>
        </div>
        <div className="border border-ink/10 rounded-xl p-5 bg-white">
          <h3 className="font-black text-ink mb-1">Телефон</h3>
          <p className="text-sm text-ink/70">+7 (7132) 56-73-82</p>
        </div>
        <div className="border border-ink/10 rounded-xl p-5 bg-white">
          <h3 className="font-black text-ink mb-1">Email</h3>
          <p className="text-sm text-ink/70">wiedergeburt-aktobe@rambler.ru</p>
        </div>
        <div className="border border-ink/10 rounded-xl p-5 bg-white">
          <h3 className="font-black text-ink mb-1">Социальные сети</h3>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://ok.ru/profile/559698692832">Одноклассники</a>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://www.instagram.com/wiedergeburt_aktobe/">Instagram Актюбинского областного общества немцев "Возрождение"</a>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://www.instagram.com/knm_jungesterne.aktobe/">Instagram Клуба Немецкой Молодёжи "Junge Sterne"</a>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://www.instagram.com/teatr_denkmal/">Instagram Немецкого Образцового Театра "Denkmal"</a>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://www.instagram.com/chorveilchen/">Instagram Немецого Образцового хора "Veilchen"</a>
          <a className="text-sm text-ink/70 hover:text-navy hover:underline cursor-pointer transition-colors" style={{ display: 'block' }} href="https://www.instagram.com/wunderkind.aktobe/">Instagram Немецкого Центра Дошкольного Дополнительного Образования "Wunderkind"</a>
        </div>
      </section>
    </div>
  );
}