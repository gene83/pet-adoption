type Animal = "dog" | "cat" | "bird";

const Search = () => {
  const animals: Animal[] = ["dog", "cat", "bird"];

  return (
    <div>
      <form action="search">
        Location:
        <label htmlFor="location">
          <input type="text" name="location" />
        </label>
        <label htmlFor="animal">
          Animal:
          <select name="animal">
            <option value="" />
            {animals.map((a) => (
              <option>{a}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed:
          <input type="select" name="breed" />
        </label>
      </form>
    </div>
  );
};

export default Search;
