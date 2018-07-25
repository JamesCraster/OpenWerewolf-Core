class LobbyItem extends React.Component {

    render() {
        return (
            <div className="lobbyItem" number={this.props.number} name={this.props.name} inplay="false" ranked={this.props.ranked}>
                <div className="lobbyItemHeader">
                    <span className="gameName">{this.props.name}</span>
                    <span className="inPlay"> OPEN </span>
                </div>
                <p className="lobbyItemBody"> {'Players: '}
                    <span>
                    </span>
                    <span id="gameType">{this.props.type}</span>
                </p>
            </div>
        );
    }
}