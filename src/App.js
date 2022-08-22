import './App.css';
import { useEffect, useRef, useState } from 'react';

const CHARS_PER_STOKES = 5;

function App() {
	const [sourceCode, setSourceCode] = useState('');
	const [content, setContent] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);

	const containerRef = useRef(null);

	useEffect(() => {
		containerRef.current.focus();

		fetch('code.txt')
			.then((res) => {
				return res.text();
			})
			.then((text) => {
				setSourceCode(text);
			});
	}, []);

	const typeCode = () => {
		setCurrentIndex(currentIndex + CHARS_PER_STOKES);
		setContent(sourceCode.substring(0, currentIndex));
	};

	const removeMessage = () => {
		console.log('escape!');
	};

	const keyDownHandler = (event) => {
		if (event.key !== 'Escape') {
			typeCode();
		} else {
			removeMessage();
		}
	};

	return (
		<>
			<div
				id='container'
				onKeyDown={keyDownHandler}
				tabIndex={0}
				ref={containerRef}
			>
				<div id='source'>{content}</div>
			</div>
		</>
	);
}

export default App;
