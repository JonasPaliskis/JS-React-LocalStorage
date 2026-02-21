import { useEffect, useState } from "react";
import DisplayListItem from "./components/DisplayListItem";
import "./App.css";

function App() {

  const storageKey = "itemList"; // localStorage raktas

  const [listItem, setListItem] = useState({
    id:0,
    title: "",
    when: "",
    status: false,
    important: false
  });

  const handleSetList = (updatedItems) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsList(updatedItems);
    console.log(updatedItems);
  }

  const [itemsList, setItemsList] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem(storageKey)) || [];
    setItemsList(storedItems);
  }, []);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setListItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCheckStatus = (itemId) => {

    const updatedItems = [...itemsList];

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {

        updatedItems[i].status = !updatedItems[i].status;
        break;
      }
    }
    handleSetList(updatedItems);
  };

  const handleCheckImportance = (itemId) => {
    const updatedItems = [...itemsList]; // copy the list
    for (let i = 0; i < updatedItems.length; i++) {
      if (updatedItems[i].id === itemId) {
        updatedItems[i].important = !updatedItems[i].important;
        break;
      }
    }
    handleSetList(updatedItems);
  };

  const handleRemoveItem = (itemId) => {

    const updatedItems = [...itemsList];

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {
        updatedItems.splice(i, 1);
        break;
      }
    }
    handleSetList(updatedItems);
  };
  const handleEditItem = (itemId) => {

    const updatedItems = [...itemsList];

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {
        setListItem(updatedItems[i]);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.target;

    const newItem = {
      id:        Date.now(),
      title:     form.title.value,   
      when:      form.when.value,    
      status:    false,        
      important: false,
    };

    const updatedItems = [...itemsList, newItem];
    handleSetList(updatedItems);

    setListItem({
      id:        0,
      title:     "",
      when:      "",
      status:    false,
      important: false,
    });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    const form = event.target;

    const updatedItem = {
      ...listItem,
      title: listItem.title,
      when: listItem.when,
    };

    const updatedItems = itemsList.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    );

    handleSetList(updatedItems);

    setListItem({
      id: 0,
      title: "",
      when: "",
      status: false,
      important: false,
    });
  };

  const handleRemoveStorage = () => {
    localStorage.removeItem(storageKey);
    setItemsList([]);
  };

  return (
    <>
      <div className="body">
        <button onClick={handleRemoveStorage}>Clear List</button>
        <DisplayListItem 
          items            = {itemsList} 
          changeImportance = {handleCheckImportance}
          changeStatus     = {handleCheckStatus}
          editItem         = {handleEditItem}
          removeItem       = {handleRemoveItem}
        />

        <div style={{
          backgroundColor: "rgb(130, 137, 135)", 
          padding: "20px", 
          borderRadius: "10px",
          margin: "20px"
          }}>
            <form 
            style={{
              backgroundColor: "rgb(170, 177, 175)",
              padding: "20px", 
              borderRadius: "10px",
              margin: "20px",
              gap: "10px"
            }} 
            onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={listItem.title}
                  onChange={handleChange}
                  required
                />

                <select
                  name="when"
                  value={listItem.when}
                  onChange={handleChange}
                  required
                >
                  <option value=""        >WHEN</option>
                  <option value="Today"   >TODAY</option>
                  <option value="Tomorrow">TOMORROW</option>
                  <option value="Upcoming">UPCOMING</option>
                </select>

                <button type="submit">Submit</button>
                <button type="button" onClick={handleSubmitEdit}>Edit</button>
              </form>
        </div>
      </div>
    </>
  );
}

export default App;
