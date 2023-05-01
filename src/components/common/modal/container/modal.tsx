export default function ModalContainer(prop: any) {

    return (
        <div id="myModal" className={"modal block-display"}>

            <div className={"modal-content"}>
                <span onClick={prop.handleModal} className={"close"}>&times;</span>
                <div className={"common-form no-shadow"}>
                    {prop.component}
                    <button onClick={prop.handleModal} className={"model-btn"}> Close </button>
                </div>
            </div>

        </div>
    );
}