import loading from '../../imgs/loading.svg'
import './Loading.css'

function Loading() {
    return(
        <div id="loadingBG">
            <img src={loading} alt="Carregando..." id="loading" />
        </div>
    )
}

export default Loading