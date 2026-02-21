import { useEffect, useState } from "react";
import DisplayListItem from "./components/DisplayListItem";
import "./App.css";

function App() {

  const storageKey = "itemList"; // localStorage pavadinimas / raktas

  // list item - vienas taskas (kai modefikuojama arba submit)  
  const [listItem, setListItem] = useState({
    id:0,
    title: "",
    when: "",
    status: false,
    important: false
  });
  
  // itemsList - visas sarasas 
  const [itemsList, setItemsList] = useState([]);

  // atnaujina sarasa
  const handleSetList = (updatedItems) => {
    localStorage.setItem(storageKey, JSON.stringify(updatedItems));
    setItemsList(updatedItems);
    console.log(updatedItems);
  }

  // paima sarasa is LocalStorage pradzioje, jei nerai tai paima []
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

  // pakeicia statusa, ar atliktas ar ne
  const handleCheckStatus = (itemId) => {

    const updatedItems = [...itemsList]; // daro kopija

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {// suranda su tapacia id

        updatedItems[i].status = !updatedItems[i].status;// pakeicia i "true" arba "false"
        break;// baigia for loop
      }
    }

    handleSetList(updatedItems);   // atnaujina sarasa

  };

  // pakeicia svarbuma, ar svarbus ar ne
  const handleCheckImportance = (itemId) => {

    const updatedItems = [...itemsList]; 

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {// suranda su tapacia id

        updatedItems[i].important = !updatedItems[i].important; // pakeicia i "true" arba "false"
        break;// baigia for loop
      }
    }
    handleSetList(updatedItems); // atnaujina sarasa
  };

  // istrina 1 is saraso
  const handleRemoveItem = (itemId) => {

    const updatedItems = [...itemsList];

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {// suranda su tapacia id
        updatedItems.splice(i, 1); // iskerpa
        break; // baigia for loop
      }
    }
    handleSetList(updatedItems);// atnaujina sarasa
  };

  // modefikavimas vieno, idedant i forma
  const handleEditItem = (itemId) => {

    const updatedItems = [...itemsList];

    for (let i = 0; i < updatedItems.length; i++) {

      if (updatedItems[i].id === itemId) {

        setListItem(updatedItems[i]);


        // pakaicia kad edit mugtukai butu
        const element = document.getElementById("editBtns");
        editBtns.style.display = "";

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

    // pakaicia kad edit mugtukai dingtu
    const element = document.getElementById("editBtns");
    editBtns.style.display = "none";
  };

  const handleCancelEdit = (event) => {
    event.preventDefault();

    setListItem({
      id: 0,
      title: "",
      when: "",
      status: false,
      important: false,
    });

    // pakaicia kad edit mugtukai dingtu
    const element = document.getElementById("editBtns");
    editBtns.style.display = "none";
  };

  const handleRemoveStorage = () => {
    localStorage.removeItem(storageKey);
    setItemsList([]);
  };

  return (
    <>
      <div className="body">
        <button className="btn btn-removeItemBtn" onClick={handleRemoveStorage}>Clear List</button>
        <br />
        
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

                <button type="submit" className="btn btn-submitBtn">Submit</button>

                <div id="editBtns" style={{display: "none"}}>
                  <button 
                    type="button"
                    className="btn btn-editBtn"
                    onClick={handleSubmitEdit}
                  >Edit</button>

                  <button 
                    type="button"
                    className="btn btn-removeItemBtn"
                    onClick={handleCancelEdit}
                  >Cancel edit</button>

                </div>
                
              </form>
        </div>
      </div>
    </>
  );
}

export default App;
