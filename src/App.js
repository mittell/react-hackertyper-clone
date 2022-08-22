import './App.css';
import { useEffect, useRef, useState } from 'react';

function App() {
	const [sourceCode, setSourceCode] = useState('');
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
		console.log('typing...');
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
				<div id='source'></div>
			</div>
		</>
	);
}

export default App;
