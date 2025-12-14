function SweetCard({ sweet, onPurchase, onRestock, onDelete, isAdmin }) {
  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p className="category">{sweet.category}</p>
      <p className="price">₹{sweet.price}</p>
      <p className="stock">Stock: {sweet.quantity}</p>

      <div className="card-actions">
        <button
          onClick={() => onPurchase(sweet._id)}
          disabled={sweet.quantity === 0}
        >
          Purchase
        </button>

        {isAdmin && (
          <>
            <button onClick={() => onRestock(sweet._id)}>Restock</button>
            <button className="danger" onClick={() => onDelete(sweet._id)}>
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default SweetCard;
