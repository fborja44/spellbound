'use client';

import useGameStore from '@/store/game-store';
import Cell from './cell';
import { useEffect, useState, useRef } from 'react';
import { CellPosition } from '@/lib/validators/game-state';
import useGame from '@/hooks/useGame';

const Board = () => {
	const board = useGameStore((state) => state.board);
	const randomizeBoard = useGameStore((state) => state.randomizeBoard);
	const selectedCells = useGameStore((state) => state.selectedCells);
	const setSelectedCells = useGameStore((state) => state.setSelectedCells);
	const isCompleted = useGameStore((state) => state.isCompleted);

	const { submitWord } = useGame();

	// selection + dragging state
	const [isDragging, setIsDragging] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		randomizeBoard();
	}, [randomizeBoard]);

	/**
	 * Check if two cells are neighbors (horizontally, vertically, or diagonally adjacent).
	 * @param a The first cell position.
	 * @param b The second cell position.
	 * @returns True if the cells are neighbors, false otherwise.
	 */
	function isNeighbor(a: CellPosition, b: CellPosition) {
		const dr = Math.abs(a.row - b.row);
		const dc = Math.abs(a.col - b.col);
		return dr <= 1 && dc <= 1 && !(dr === 0 && dc === 0);
	}

	// pointer handlers
	function handlePointerDown(row: number, col: number) {
		if (isCompleted) return;

		setIsDragging(true);
		setSelectedCells([{ row, col }]);
	}

	function handlePointerEnter(row: number, col: number) {
		if (isCompleted) return;

		if (!isDragging) return;

		setSelectedCells((prev: CellPosition[]) => {
			if (prev.length === 0) return prev;

			const last = prev[prev.length - 1];
			const secondLast = prev[prev.length - 2];

			// If the user drags back onto the second-last cell,
			// remove the last cell (undo last step)
			if (secondLast && secondLast.row === row && secondLast.col === col) {
				return prev.slice(0, -1);
			}

			// Avoid reselecting the same cell
			if (prev.some((c) => c.row === row && c.col === col)) return prev;

			// Only add if adjacent to last selected
			if (isNeighbor(last, { row, col })) {
				return [...prev, { row, col }];
			}

			return prev;
		});
	}

	function handlePointerUp() {
		if (selectedCells.length === 0 || isCompleted) {
			setIsDragging(false);
			return;
		}
		submitWord();
		setIsDragging(false);
	}

	useEffect(() => {
		window.addEventListener('mouseup', handlePointerUp);
		window.addEventListener('touchend', handlePointerUp);
		return () => {
			window.removeEventListener('mouseup', handlePointerUp);
			window.removeEventListener('touchend', handlePointerUp);
		};
	}, []);

	// Compute SVG line coordinates
	const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

	useEffect(() => {
		if (!containerRef.current) return;
		const containerRect = containerRef.current.getBoundingClientRect();

		const pts = selectedCells.map((cell) => {
			const el = document.getElementById(`cell-${cell.row}-${cell.col}`);
			if (!el) return { x: 0, y: 0 };
			const rect = el.getBoundingClientRect();
			return {
				x: rect.left - containerRect.left + rect.width / 2,
				y: rect.top - containerRect.top + rect.height / 2,
			};
		});

		setPoints(pts);
	}, [selectedCells]);

	useEffect(() => {
		const handleResize = () => {
			if (!containerRef.current || selectedCells.length === 0) return;
			const containerRect = containerRef.current.getBoundingClientRect();
			const pts = selectedCells.map((cell) => {
				const el = document.getElementById(`cell-${cell.row}-${cell.col}`);
				if (!el) return { x: 0, y: 0 };
				const rect = el.getBoundingClientRect();
				return {
					x: rect.left - containerRect.left + rect.width / 2,
					y: rect.top - containerRect.top + rect.height / 2,
				};
			});
			setPoints(pts);
		};
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [selectedCells]);

	return (
		<div ref={containerRef} className='relative w-fit select-none'>
			{/* SVG Lines */}
			<svg className='absolute inset-0 w-full h-full pointer-events-none z-0 stroke-sky-500'>
				{points.slice(0, -1).map((p, i) => {
					const next = points[i + 1];
					return (
						<line
							key={i}
							x1={p.x}
							y1={p.y}
							x2={next.x}
							y2={next.y}
							strokeWidth='12'
							strokeLinecap='round'
						/>
					);
				})}
			</svg>

			{/* Game board */}
			<section
				className='grid grid-cols-5 grid-rows-5 gap-3.5 relative z-10'
				onMouseLeave={handlePointerUp}
			>
				{board.flat().map((cell, index) => {
					const row = Math.floor(index / 5);
					const col = index % 5;

					return (
						<div
							key={index}
							id={`cell-${row}-${col}`}
							onMouseDown={() => handlePointerDown(row, col)}
							onMouseEnter={() => handlePointerEnter(row, col)}
							onTouchStart={() => handlePointerDown(row, col)}
							onTouchMove={(e) => {
								const touch = e.touches[0];
								const target = document.elementFromPoint(
									touch.clientX,
									touch.clientY
								) as HTMLElement;
								if (target?.id?.startsWith('cell-')) {
									const [_, r, c] = target.id.split('-');
									handlePointerEnter(Number(r), Number(c));
								}
							}}
							className='rounded-lg'
						>
							<Cell
								row={row}
								col={col}
								letter={cell.letter}
								isCharged={cell.isCharged}
								bonus={cell.bonus}
								index={index}
							/>
						</div>
					);
				})}
			</section>
		</div>
	);
};

export default Board;
