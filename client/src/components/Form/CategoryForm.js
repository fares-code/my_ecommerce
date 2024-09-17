export default function CategoryForm({ handleSubmit, value, setValue }) {
    return (
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="categoryName" className="form-label">Category Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="categoryName"
            name="name"
            value={value}
            onChange={(e) => setValue(e.target.value)} 
            placeholder="Enter Category Name" 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    );
  }
  