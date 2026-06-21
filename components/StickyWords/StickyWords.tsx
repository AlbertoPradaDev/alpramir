'use client'

const WORDS = ['amor.', 'la fe.', 'la amistad.', 'el día a día.', 'el pop.', 'la balada latina.']

export default function StickyWords() {
  return (
    <section className="sticky-words" aria-label="Canto sobre el amor, la fe, la amistad, el día a día, el pop y la balada latina">
      <header className="head">
        <div className="row">
          <h2 className="lead">
            <span aria-hidden="true">Canto&nbsp;sobre&nbsp;</span>
            <span className="sr-only">Canto sobre el amor.</span>
          </h2>
          <ul aria-hidden="true">
            {WORDS.map((w) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </div>
      </header>
    </section>
  )
}
