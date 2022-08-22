import './App.css';
import { useEffect, useRef, useState } from 'react';
import Message from './components/Message';

const CHARS_PER_STOKES = 5;

function App() {
	const [sourceCode, setSourceCode] = useState('');
	const [content, setContent] = useState('');
	const [currentIndex, setCurrentIndex] = useState(0);
	const [messageType, setMessageType] = useState('denied');
	const [isLocked, setIsLocked] = useState(false);

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
		if (isLocked) {
			return;
		}

		setCurrentIndex(currentIndex + CHARS_PER_STOKES);
		setContent(sourceCode.substring(0, currentIndex));

		if (currentIndex !== 0 && currentIndex % 300 === 0) {
			setIsLocked(true);
			setMessageType('denied');
		}

		if (currentIndex !== 0 && currentIndex % 900 === 0) {
			setIsLocked(true);
			setMessageType('success');
		}
	};

	const removeMessage = () => {
		setIsLocked(false);
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
			{isLocked && <Message type={messageType} />}
		</>
	);
}

export default App;
