'use client';

import type { RoomPreset } from '@/lib/color-studio/rooms';
import styles from './studio.module.css';

export default function WallPicker({ room, selected, onSelect, showOutlines }: {
  room: RoomPreset; selected: string | null; onSelect: (id: string) => void; showOutlines: boolean;
}) {
  return (
    <div className={styles.wallPicker}>
      <svg viewBox={`0 0 ${room.width} ${room.height}`} aria-hidden="true" className={styles.wallOutlines}>
        <g transform="matrix(1.5 0 0 1.5 -750 -270)">
          {room.walls.map(wall => <path key={wall.id} d={wall.outlinePath}
            onClick={() => onSelect(wall.id)}
            className={`${styles.wallHitArea} ${selected === wall.id ? styles.activeWall : ''} ${showOutlines ? styles.showOutline : ''}`}
            vectorEffect="non-scaling-stroke" fillRule="evenodd" />)}
        </g>
      </svg>
      {room.walls.map((wall, index) => <button key={wall.id} type="button"
        className={styles.wallTarget} style={{ left: `${wall.target.x}%`, top: `${wall.target.y}%` }}
        aria-label={`Paint wall ${index + 1}: ${wall.name}`} aria-pressed={selected === wall.id}
        onClick={() => onSelect(wall.id)} title={wall.name}>
        <span aria-hidden="true">{index + 1}</span>
      </button>)}
    </div>
  );
}
