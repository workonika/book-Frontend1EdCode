export const Component = (props) => {
    
    return (
        <React.Fragment>
            <h3>Привет { props.name }!</h3>
            <p>
                У вас { props.messageCount } непрочитанных сообщений
            </p>
        </React.Fragment>
    );
}