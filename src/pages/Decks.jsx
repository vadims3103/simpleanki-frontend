import { useEffect, useState } from "react";
import { getDecks, createDeck, deleteDeck, updateDeck } from "../api";
import { Link } from "react-router-dom";

export default function Decks() {
    const [decks, setDecks] = useState([]);

    // Add deck form
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Edit state
    const [editingDeckId, setEditingDeckId] = useState(null);
    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");

    useEffect(() => {
        fetchDecks();
    }, []);

    const fetchDecks = async () => {
        const data = await getDecks();
        setDecks(data);
    };

    const handleCreate = async () => {
        if (!title) return;
        await createDeck({ title, description }); // include description
        setTitle("");
        setDescription(""); // reset input
        fetchDecks();
    };

    const handleDeleteDeck = async (deckId) => {
        // if (!confirm("Delete this deck? All cards will be removed.")) return;

        await deleteDeck(deckId);

        // reload decks
        const updated = await getDecks();
        setDecks(updated);
    };

    const startEditDeck = (deck) => {
        setEditingDeckId(deck.id);
        setEditTitle(deck.title);
        setEditDescription(deck.description);
    };

    const handleSaveDeck = async () => {
        await updateDeck({
            id: editingDeckId,
            title: editTitle,
            description: editDescription,
        });

        setEditingDeckId(null);
        fetchDecks();
    }

    return (
        <div>
            <h1>Decks</h1>

            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Deck title"
            />
            <br />
            <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Deck description"
            />
            <br />
            <button onClick={handleCreate}>Create Deck</button>

            <ul>
                {decks.map((deck) => (
                    <li key={deck.id}>
                        {editingDeckId === deck.id ? (
                            <>
                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                            />
                            <input
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            />
                            <button onClick={handleSaveDeck}>Save</button>
                            <button onClick={() => setEditingDeckId(null)}>Cancel</button>
                            </>
                        ) : (
                            <>
                            <Link to={`/deck/${deck.id}`}>
                                <strong>{deck.title}</strong>: {deck.description || "No description"} ({deck.cards.length} cards)
                            </Link>
                            <button onClick={() => startEditDeck(deck)}>Edit</button>
                            <button
                                onClick={() => handleDeleteDeck(deck.id)}
                                style={{ marginLeft: "10px", color: "red", cursor: "pointer" }}
                            >
                                Delete
                            </button>
                            </>
                        )}
                    </li>
                ))}
            </ul>


        </div>
    );
}
