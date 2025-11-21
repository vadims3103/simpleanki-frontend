import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDeck, createCard, deleteCard, getCardsByDeck, updateCard } from "../api";

export default function DeckDetails() {
    const { id } = useParams(); // deckId from URL
    const [deck, setDeck] = useState(null);

    // Add card form
    const [front, setFront] = useState("");
    const [back, setBack] = useState("");

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editFront, setEditFront] = useState("");
    const [editBack, setEditBack] = useState("");

    useEffect(() => {
        fetchDeck();
    }, []);

    const fetchDeck = async () => {
        const data = await getDeck(id);
        setDeck(data);
    };

    const handleAddCard = async () => {
        if (!front || !back) return;

        await createCard({ deckId: id, front, back });
        setFront("");
        setBack("");
        fetchDeck();
    };

    async function handleDelete(cardId) {
        // if (!confirm("Delete this card?")) return;
        await deleteCard(cardId);
        fetchDeck();

        // reload cards after deletion
        const updatedCards = await getCardsByDeck(deckId);
        setCards(updatedCards);
    }

    const startEdit = (card) => {
        setEditingId(card.id);
        setEditFront(card.front);
        setEditBack(card.back);
    };

    const handleSave = async (cardId) => {
        await updateCard({
            id: cardId,
            deckId: id,
            front: editFront,
            back: editBack,
        });

        setEditingId(null);
        fetchDeck();
    };

    if (!deck) return <div>Loading...</div>;

    return (
        <div>
            <h1>{deck.title}</h1>
            <p>{deck.description}</p>

            <h2>Add Card</h2>
            <input
                value={front}
                onChange={(e) => setFront(e.target.value)}
                placeholder="Front"
            />
            <br />
            <input
                value={back}
                onChange={(e) => setBack(e.target.value)}
                placeholder="Back"
            />
            <br />
            <button onClick={handleAddCard}>Add Card</button>

            <h2>Cards</h2>
            <ul>
                {deck.cards.map((c) => (
                    <li key={c.id}>
                        { editingId === c.id ? (
                            <>
                                <input
                                    value={editFront}
                                    onChange={(e) => setEditFront(e.target.value)}
                                />
                                <input
                                    value={editBack}
                                    onChange={(e) => setEditBack(e.target.value)} 
                                />
                                <button onClick={() => handleSave(c.id)}>Save</button>
                                <button onClick={() => setEditingId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                                <strong>{c.front}</strong> → {c.back}
                                <button onClick={() => startEdit(c)}>Edit</button>
                                <button onClick={() => handleDelete(c.id)}>Delete</button>
                            </>
                        )
                        }
                    </li>
                ))}
            </ul>
            <Link to={`/deck/${deck.id}/study`}>
                <button>Study Deck</button>
            </Link>
            <br />
            <Link to={`/`}>Back</Link>
        </div>
    );
}