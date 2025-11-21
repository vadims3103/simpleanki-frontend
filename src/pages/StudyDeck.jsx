import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCardsByDeck } from "../api";

export default function StudyDeck() {
    const { id } = useParams();
    const [cards, setCards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showBack, setShowBack] = useState(false);
    const [results, setResults] = useState([]);

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        const data = await getCardsByDeck(id);
        setCards(data);
        setCurrentIndex(0);
        setShowBack(false);
        setResults([]);
    };

    if (!cards.length) return (
        <div>
            <div>Loading or no cards in this deck...</div>
            <Link to={`/deck/${id}`}>Back to Deck</Link>
        </div>
    )

    const currentCard = cards[currentIndex];

    const handleShowAnswer = () => setShowBack(true);

    const handleAnswer = (correct) => {
        setResults([...results, {cardId: currentCard.id, correct}]);
        setShowBack(false);
        if (currentIndex + 1 < cards.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setCurrentIndex(cards.length);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setShowBack(false);
        setResults([]);
    }

    if (currentIndex >= cards.length) {
        const correctCount = results.filter(r => r.correct).length;
        return (
            <div>
                <h2>Study complete</h2>
                <p>
                    You got {correctCount} / {cards.length} correct.
                </p>
                <button onClick={handleRestart}>Restart Deck</button>
                <br />
                <Link to={`/deck/${id}`}>Back</Link>
            </div>
        );
    }

    return (
        <div>
            <h2>Deck Study Mode: Card {currentIndex + 1} / {cards.length}</h2>
            <div style={{ border: "1px solid #ccc", padding: "20px", margin: "10px 0" }}>
                <p>{showBack ? currentCard.back : currentCard.front}</p>
            </div>

            {!showBack ? (
                <button onClick={handleShowAnswer}>Show Answer</button>
            ) : (
                <>
                    <button onClick={() => handleAnswer(true)} style={{ marginRight: "10px" }}>
                        Correct
                    </button>
                    <button onClick={() => handleAnswer(false)}>Incorrect</button>
                </>
            )}

             <div style={{ marginTop: "20px" }}>
                <Link to={`/deck/${id}`}>Back to Deck</Link>
            </div>
        </div>
    )
}