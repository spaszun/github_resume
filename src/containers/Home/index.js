import React from 'react';
import { Input, Button } from "./../../components";
import { Flex, Box } from "@rebass/grid";
import styled from "styled-components";
import Resume from '../Resume';

class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            inputValue: '',
            createResume: false
        }
    }

    onChange(value) {
        this.setState({ inputValue: value});
    }

    createResume() {
        this.setState({ createResume: true});
    }

    render() {
        if (this.state.createResume) {
            return <Resume githubNick={this.state.inputValue}/>
        }

        return (
            <Flex flexDirection="column" alignItems="center" justifyContent="center">
                <Box width={1/2} px={2}>
                    <Input onChange={e => this.onChange(e.target.value)}
                    placeholder='github nickname'
                    />
                    <Button
                    type="button"
                    onClick={() => this.createResume()}
                    primary
                    >
                    Create resume
                    </Button>
                </Box>
            </Flex>
        );
    }
}

export default Home;