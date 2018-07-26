class LobbyItem extends React.Component {

    render() {
        return (
            <div className="lobbyItem" number={this.props.number} name={this.props.name} inplay="false" ranked={this.props.ranked}>
                <div className="lobbyItemHeader">
                    <p>
                        <span className="gameName">{this.props.name}</span>
                        <span className="inPlay"> OPEN </span>
                    </p>
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