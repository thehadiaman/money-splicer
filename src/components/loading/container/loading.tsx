export default function LoadingPageContainer(props: any) {
    if(props.isLoading){
        document.body.style.backgroundColor = 'rgba(51, 170, 51, .3)';
    }else{
        document.body.style.backgroundColor = '';
    }
    return (
        <div className={"spinner"}> </div>
    );
}