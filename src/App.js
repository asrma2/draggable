import React, { Component } from 'react';
import DragBox from './components/DragBox';
import './App.css';

const WIDTH = 200;
const HEIGHT = 100;

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            boxes: [
                {
                    boxId: 0,
                    position: { x: 0, y: 0 },
                    size: { x: WIDTH, y: HEIGHT },
                },
            ],
        };
    }

    onAddItem = () => {
        const childBox = this.state.boxes[this.state.boxes.length - 1];
        const newBoxId = childBox.boxId + 1;

        const newPosition = {
            x: childBox.position.x,
            y: childBox.position.y,
        };

        const newSize = {
            x: childBox.size.x + WIDTH,
            y: childBox.size.y + HEIGHT,
        };

        // Set child's position to (0, 0) relative to parent
        childBox.position.x = 0;
        childBox.position.y = 0;
        const newBoxes = [
            ...this.state.boxes.map(b => {
                if (b.boxId === childBox.id) {
                    return childBox;
                }
                return b;
            }),
            {
                boxId: newBoxId,
                position: newPosition,
                size: newSize,
            }
        ];
        this.setState(state => ({ ...state, boxes: newBoxes }));
    };

    handleDrag = (boxId, position) => {
        const box = this.state.boxes.filter(cBox => cBox.boxId === boxId)[0];

        const newBoxes = this.state.boxes.map((currentBox) => {
            if (currentBox.boxId === box.boxId) {
                return {
                    ...box,
                    position: { x: position.x, y: position.y },
                };
            }
            return currentBox;
        });
        this.setState(state => ({ ...state, boxes: newBoxes }));
    }

    renderRecursive(box, children) {
        return (
            <DragBox {...box} onDrag={this.handleDrag}>
                {children && children.length > 0 && this.renderRecursive(children[0], children.slice(1))}
            </DragBox>
        );
    }

    render() {
        const reversedBoxes = [...this.state.boxes].reverse();
        return [
            <div>
                <button onClick={this.onAddItem}>Add Parent</button>
                <div style={{ height: '100vh' }}>
                    {this.renderRecursive(reversedBoxes[0], reversedBoxes.slice(1))}
                </div>
            </div>
        ];
    }
}

export default App;
