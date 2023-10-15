
export default function Content({ id, name, description }) {
    return (
        <>
            <div style={{ display: "flex", gap: "2rem" }}>
                <h4 style={{ flex: 1 }}>{name}</h4>
                <span style={{ color: "#B6A4A4" }}>#{id}</span>
            </div>
            <span style={{ color: "#CF8A8A", fontSize: "15px" }}>{description}</span>
        </>
    )
}
