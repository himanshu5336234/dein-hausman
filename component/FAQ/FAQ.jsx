import { useState } from 'react';
import Question from "../../constent/questions"

export default function FAQ() {

    const [selected, setSelected] = useState(null);

    const toggle = i => {
        if (selected === i) {
            return setSelected(null);
        }
        setSelected(i);
    };
    return (
        <div className='FAQ text-center'>
            <h3>Frequently Asked Questions</h3>
            <div className='accordion-section'>
                {Question.map((item, i) => (
                    <div key={i} className='accordion'>
                        <div className='title d-flex justify-content-between align-items-center fixed' onClick={() => toggle(i)}>
                            <p className='accordion-title'>{item.question}</p>
                            <span>{selected === i ? <h3 className="plus-sign">-</h3> : <h3 className="plus-sign">+</h3>}</span>
                        </div>
                        <div className={selected === i ? 'content show' : 'content'}>{item.answer}</div>
                    </div>
                ))
                }
            </div>
        </div>
    );
}
