const DisplayByTimeListItems = ({ 
    items, 
    printItems 
}) => {
    // surusioja pagal svaba
    const sortedItems = [...items].sort((a, b) => {
        return b.id - a.id;
    });


  return (

    <div style={{
        backgroundColor: "rgb(130, 137, 135)", 
        padding: "20px", 
        borderRadius: "10px",
        margin: "20px"
        }}>
        <h2>Task</h2>
            {printItems(sortedItems, "")}
    </div>
    );
};

export default DisplayByTimeListItems;
