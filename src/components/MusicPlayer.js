import React, { memo, useCallback } from 'react';
import { Button, Slider, Typography, Space, Avatar } from 'antd';
import { 
  PlayCircleOutlined, 
  PauseCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  HeartOutlined,
  DownloadOutlined,
  SoundOutlined
} from '@ant-design/icons';
import { formatTime } from '../utils/helpers';

const { Text } = Typography;

const MusicPlayer = memo(({
  currentSong,
  isPlaying,
  currentTime,
  duration,
  volume,
  isLoading,
  error,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onLike,
  onDownload,
  className = "",
  style = {}
}) => {
  const handleSeekChange = useCallback((value) => {
    if (onSeek) {
      onSeek(value);
    }
  }, [onSeek]);

  const handleVolumeChange = useCallback((value) => {
    if (onVolumeChange) {
      onVolumeChange(value);
    }
  }, [onVolumeChange]);

  const handleLike = useCallback(() => {
    if (onLike && currentSong) {
      onLike(currentSong);
    }
  }, [onLike, currentSong]);

  const handleDownload = useCallback(() => {
    if (onDownload && currentSong) {
      onDownload(currentSong);
    }
  }, [onDownload, currentSong]);

  if (error) {
    return (
      <div className={`music-player error ${className}`} style={style}>
        <div className="error-message">
          <Text type="danger">Error: {error}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className={`music-player ${className}`} style={style}>
      <div className="player-header">
        <Text strong>Now Playing</Text>
      </div>

      {currentSong ? (
        <div className="player-content">
          <div className="song-info">
            <Avatar
              src={currentSong.image}
              alt={currentSong.name}
              size={60}
              shape="square"
              className="song-avatar"
            />
            <div className="song-details">
              <Text strong className="song-title">{currentSong.name}</Text>
              <Text type="secondary" className="song-artist">{currentSong.artist}</Text>
            </div>
          </div>

          <div className="player-controls">
            <Space>
              <Button
                type="text"
                icon={<StepBackwardOutlined />}
                onClick={onPrevious}
                disabled={isLoading}
              />
              
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
                onClick={onPlayPause}
                loading={isLoading}
                className="play-pause-button"
              />
              
              <Button
                type="text"
                icon={<StepForwardOutlined />}
                onClick={onNext}
                disabled={isLoading}
              />
            </Space>
          </div>

          <div className="progress-section">
            <Text className="time-display">{formatTime(currentTime)}</Text>
            <Slider
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeekChange}
              tooltip={{ formatter: (value) => formatTime(value) }}
              className="progress-slider"
            />
            <Text className="time-display">{formatTime(duration)}</Text>
          </div>

          <div className="volume-section">
            <SoundOutlined />
            <Slider
              min={0}
              max={1}
              step={0.1}
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>

          <div className="player-actions">
            <Button
              type="text"
              icon={<HeartOutlined />}
              onClick={handleLike}
              className="action-button"
            />
            <Button
              type="text"
              icon={<DownloadOutlined />}
              onClick={handleDownload}
              className="action-button"
            />
          </div>
        </div>
      ) : (
        <div className="no-song">
          <Text type="secondary">No song selected</Text>
        </div>
      )}
    </div>
  );
});

MusicPlayer.displayName = 'MusicPlayer';

export default MusicPlayer;
