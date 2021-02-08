const IntersectionFAB = (props) => {
    return (
        <View style={{ flex: 1 }}>
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{}}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active })}>
                <Icon name="images" />
                <Button style={{ backgroundColor: '#34A34F' }}>
                    <Icon name="" />
                </Button>
                <Button style={{ backgroundColor: '#3B5998' }}>
                    <Icon name="logo-facebook" />
                </Button>
                <Button disabled style={{ backgroundColor: '#DD5144' }}>
                    <Icon name="mail" />
                </Button>
            </Fab>
        </View>
    );
};
