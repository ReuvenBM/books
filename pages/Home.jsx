const { useRef, useEffect } = React

export function Home() {
    const h1Ref = useRef()

    useEffect(() => {
        console.log('h1Ref:', h1Ref)
    }, [])

    return (
        <section className="home">
            <h1 ref={h1Ref}>Book's R Us!</h1>
            <img src="./assets/img/books-HP.jpg" alt="books-image" />
        </section>
    )
}