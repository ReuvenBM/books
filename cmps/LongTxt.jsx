const { useState, useEffect } = React

export function LongTxt({ txt, length = 100 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    setIsExpanded(false) 
  }, [txt])

  const displayedTxt = isExpanded ? txt : txt.slice(0, length)

  return (
    <section className="long-txt">
      <p>
        {displayedTxt}
        {txt.length > length && (
          <span onClick={() => setIsExpanded(prev => !prev)} className="toggle-btn">
            {isExpanded ? ' Read Less' : '... Read More'}
          </span>
        )}
      </p>
    </section>
  )
}
