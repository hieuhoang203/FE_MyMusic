import React, { memo } from 'react';
import { Card, Button, Avatar, Typography, Space } from 'antd';
import { PlayCircleOutlined, HeartOutlined, MoreOutlined } from '@ant-design/icons';
import { formatTime } from '../utils/helpers';

const { Text, Title } = Typography;

const MusicCard = memo(({ 
  song, 
  index, 
  onPlay, 
  onLike, 
  onMore,
  isPlaying = false,
  isLoading = false,
  showIndex = true,
  size = 'default'
}) => {
  const handlePlay = () => {
    if (onPlay) {
      onPlay(song, index);
    }
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (onLike) {
      onLike(song, index);
    }
  };

  const handleMore = (e) => {
    e.stopPropagation();
    if (onMore) {
      onMore(song, index);
    }
  };

  const cardSize = size === 'small' ? 'small' : 'default';
  const imageSize = size === 'small' ? 40 : 60;

  return (
    <Card
      hoverable
      size={cardSize}
      className={`music-card ${isPlaying ? 'playing' : ''}`}
      bodyStyle={{ padding: size === 'small' ? '8px 12px' : '12px 16px' }}
      onClick={handlePlay}
    >
      <div className="music-card-content">
        <div className="music-info">
          {showIndex && (
            <Text className="song-index" type="secondary">
              {index + 1}
            </Text>
          )}
          
          <Avatar
            src={song.image}
            alt={song.name}
            size={imageSize}
            shape="square"
            className="song-avatar"
          />
          
          <div className="song-details">
            <Title level={size === 'small' ? 5 : 4} className="song-title">
              {song.name}
            </Title>
            <Text type="secondary" className="song-artist">
              {song.artist}
            </Text>
          </div>
        </div>

        <div className="music-actions">
          <Text type="secondary" className="song-duration">
            {formatTime(song.duration)}
          </Text>
          
          <Space>
            <Button
              type="text"
              icon={<PlayCircleOutlined />}
              onClick={handlePlay}
              loading={isLoading}
              className="play-button"
            />
            
            <Button
              type="text"
              icon={<HeartOutlined />}
              onClick={handleLike}
              className="like-button"
            />
            
            <Button
              type="text"
              icon={<MoreOutlined />}
              onClick={handleMore}
              className="more-button"
            />
          </Space>
        </div>
      </div>
    </Card>
  );
});

MusicCard.displayName = 'MusicCard';

export default MusicCard;
