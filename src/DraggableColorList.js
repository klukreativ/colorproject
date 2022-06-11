import DraggableColorBox from './DraggableColorBox';
import { SortableContainer } from 'react-sortable-hoc';

const DraggableColorList = SortableContainer((props) => {    
    return (
        // inline style in order to allow the DraggableColorBox components to appear b/c they use % for dimensions
        <div style={{ height: '100%' }}>
            {
                props.colors.map((color, i) => (
                    <DraggableColorBox
                        index={i}
                        color={color.color}
                        name={color.name}
                        key={color.name}
                        deleteColorBox={props.deleteColorBox}
                    />
                ))
            }
        </div>
    )
})

export default DraggableColorList;