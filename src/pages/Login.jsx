import { Link } from "react-router-dom"
import "../styles/Login.css"

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
        <div id="login-container">
            <Link className="button-icon" to={"/"}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"/>
</svg>Volver</Link>
            <form id="login" onSubmit={saveData}>
                <label for="id" className="not-selectable">ID</label>
                <input type="text" id="id" name="id"></input>
                <label for="secret" className="not-selectable">SECRET</label>
                <input type="text" id="secret" name="secret"></input>
                <button type="submit" className="button-text">Guardar</button>
            </form>
        </div>
    )
}