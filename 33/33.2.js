export const Component = ({ name, messageCount }) => {
    
    return (
        <React.Fragment>
            <h3>Привет { name }!</h3>
            <p>
                У вас { messageCount } непрочитанных сообщений
            </p>
        </React.Fragment>
    );
}