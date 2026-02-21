const DisplayListItem = ({ 
    items, 
    changeImportance, 
    changeStatus,
    editItem,
    removeItem 
}) => {
    /// surusioja pagal svaba
    items.sort((task_1, task_2) => {
        if (task_1.important !== task_2.important) {
            return task_2.important - task_1.important;
        }
    });

    /// filtruoja pagal laika 
    const todayItems    = items.filter(item => item.when === "Today"   );
    const tomorrowItems = items.filter(item => item.when === "Tomorrow");
    const upcomingItems = items.filter(item => item.when === "Upcoming");

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
                    <input type="checkbox" checked={item.important} onChange={() => changeImportance(item.id)} />
                    <input type="checkbox" checked={item.status} onChange={() => changeStatus(item.id)}/>

                    <span
                        style={{
                        flexGrow: 1,
                        color: item.important ? "red" : "black", // jei svarbus tai pazymimas radonai
                        textDecoration: item.status ? "line-through" : "none", // jei atliktas tai tampa isbrauktas
                        }}
                    >
                        {item.title}
                    </span>

                    <button onClick={() => editItem(item.id)} 
                            style={{ padding: "2px 6px" }}
                            className="btn btn-editItemBtn"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => removeItem(item.id)}
                        className="btn btn-removeItemBtn"
                    > X </button>
                    </div>
                ))}
        </div>

  return (

    <div style={{
        backgroundColor: "rgb(130, 137, 135)", 
        padding: "20px", 
        borderRadius: "10px",
        margin: "20px"
        }}>
        <h2>Task</h2>

        {todayItems.length > 0 && ( // jei tuscias sarasa tai nespausdina
        <>
            {printItems(todayItems, "Today")}

        </>
        )}

        {tomorrowItems.length > 0 && ( // jei tuscias sarasa tai nespausdina
        <>
            {printItems(tomorrowItems, "Tomorrow")}
        </>
        )}

        {upcomingItems.length > 0 && ( // jei tuscias sarasa tai nespausdina
        <>
            {printItems(upcomingItems, "Upcoming")}
        </>
        )}
    </div>
    );
};

export default DisplayListItem;
