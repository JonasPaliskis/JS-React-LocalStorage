import { useEffect, useState } from "react";
import DisplayByDayListItems from "./components/displayByDayListItems";
import DisplayByTimeListItems from "./components/displayByTimeListItems";
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

  //issiuncia nauja saraso vieneta
  const handleSubmit = (event) => {
    event.preventDefault(); // stabdo perkrovima puslapio

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

    setListItem({ // padaro tuscia forma
      id:        0,
      title:     "",
      when:      "",
      status:    false,
      important: false,
    });
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault(); // stabdo perkrovima puslapio

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

    setListItem({  // padaro tuscia forma
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
    event.preventDefault(); // stabdo perkrovima puslapio
 
    setListItem({ // padaro tuscia forma
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

  // istrina visa sarasa
  const handleRemoveStorage = () => {
    localStorage.removeItem(storageKey);
    setItemsList([]);
  };


  // nustato pagal kuri metoda rusioja sarasa 
  const [sortChange, setSortChange] = useState(true);
  const handleChangeSort = () => {
    setSortChange(!sortChange);
  };

  // atspausdina sarasu
  const printItems = (list, timeTitle) =>
        <div style={{
                backgroundColor: "rgb(170, 177, 175)", 
                padding: "10px", 
                borderRadius: "10px",
                margin: "10px" 
                }}>
                <h3>{timeTitle}</h3>

                {list.map(item => (

                <div
                    key={item.id}

                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        padding: "5px 0",
                        borderBottom: "1px solid #ccc",
                    }}
                    
                    >
                    <input type="checkbox" checked={item.important} onChange={() => handleCheckImportance(item.id)} />
                    <input type="checkbox" checked={item.status}    onChange={() => handleCheckStatus(item.id)}/>

                    <span
                        style={{
                        flexGrow: 1,
                        color: item.important ? "red" : "black", // jei svarbus tai pazymimas radonai
                        textDecoration: item.status ? "line-through" : "none", // jei atliktas tai tampa isbrauktas
                        }}
                    >
                        {item.title}
                    </span>

                    <button onClick={() => handleEditItem(item.id)} 
                            style={{ padding: "2px 6px" }}
                            className="btn btn-editItemBtn"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="btn btn-removeItemBtn"
                    > X </button>
                    </div>
                ))}
        </div>

  return (
    <>
      <div className="body">
        <button className="btn btn-removeItemBtn" onClick={handleRemoveStorage}>Clear List</button>
        <button className="btn btn-submitBtn" onClick={handleChangeSort}>Change sort</button>
        <br />
        <div style={{display: sortChange ? "none" : ""}}>
        <DisplayByDayListItems // perduoda sarasa, atspausdinima saraso ir mygtuku funkcijas
          items      = {itemsList} 
          printItems = {printItems}
          // changeImportance = {handleCheckImportance}
          // changeStatus     = {handleCheckStatus}
          // editItem         = {handleEditItem}
          // removeItem       = {handleRemoveItem}
        />
        </div>

        <div style={{display: sortChange ? "" : "none"}}>
        <DisplayByTimeListItems // perduoda sarasa, atspausdinima saraso ir mygtuku funkcijas
          items      = {itemsList} 
          printItems = {printItems}
        />
        </div>

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

                {/* "Edit" ir "Cancel edit" mygtukai  nematomi kol nepaspaudi ant saraso "edit" mygtuko*/}
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
