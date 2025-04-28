import { Link } from "react-router-dom"

export default function Login() {
    function saveData(e) {
        e.preventDefault()

        const form = e.target
        const formData = new FormData(form)
        const formJson = Object.fromEntries(formData.entries())

        localStorage.setItem("id", formJson.id)
        localStorage.setItem("secret", formJson.secret)
    }

    return (
        <div>
            <form onSubmit={saveData}>
                <label for="id">Ingrese ID</label>
                <input type="text" id="id" name="id"></input>
                <label for="secret">Ingrese SECRET</label>
                <input type="text" id="secret" name="secret"></input>
                <button type="submit">Guardar</button>
            </form>
            <Link to={"/"}>Volver</Link>
        </div>
    )
}