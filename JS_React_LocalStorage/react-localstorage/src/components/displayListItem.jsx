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

    
    const printItems = (list) =>
        list.map(item => (

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
                color: item.important ? "red" : "black",
                textDecoration: item.status ? "line-through" : "none",
                }}
            >
                {item.title}
            </span>

            <button onClick={() => editItem(item.id)} style={{ padding: "2px 6px" }}>
                Edit
            </button>

            <button
                onClick={() => removeItem(item.id)}
                style={{
                padding: "2px 6px",
                backgroundColor: "#ff4d4d",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                }}
            >
                X
            </button>
            </div>
        ));

  return (

    <div style={{
        backgroundColor: "rgb(130, 137, 135)", 
        padding: "20px", 
        borderRadius: "10px",
        margin: "20px"
        }}>

        {todayItems.length > 0 && (
        <>
            <div style={{
                backgroundColor: "rgb(170, 177, 175)", 
                padding: "10px", 
                borderRadius: "10px",
                margin: "10px" 
                }}>

                <h3>Today</h3>
                {printItems(todayItems)}
            </div>
        </>
        )}

        {tomorrowItems.length > 0 && (
        <>
            <div style={{
                backgroundColor: "rgb(170, 177, 175)", 
                padding: "10px", 
                borderRadius: "10px",
                margin: "10px" 
                }}>
                    <h3>Tomorrow</h3>
                    {printItems(tomorrowItems)}
                </div>

        </>
        )}

        {upcomingItems.length > 0 && (
        <>
            <div style={{
                backgroundColor: "rgb(170, 177, 175)", 
                padding: "10px", 
                borderRadius: "10px",
                margin: "10px" 
                }}>
                    <h3>Upcoming</h3>
                    {printItems(upcomingItems)}            
                </div>

        </>
        )}
    </div>
    );
};

export default DisplayListItem;
