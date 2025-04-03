import { useState } from 'react';
import { Box, Skeleton } from '@chakra-ui/react';
import Image from 'next/image';

export default function OptimizedImage({ src, alt, className, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Box 
      rounded={'lg'}
     
      pos={'relative'}
      height={'230px'} // Fixed height
      
      overflow={'hidden'} // Prevent image overflow
      _after={{
        transition: 'all .3s ease',
        content: '""',
        w: 'full',
        h: 'full',
        pos: 'absolute',
        top: 5,
        left: 0,
        filter: 'blur(15px)',
        zIndex: -1,
      }}
      _groupHover={{
        _after: {
          filter: 'blur(20px)',
        },
      }}
    >
      {isLoading && (
        <Skeleton 
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          borderRadius="lg"
        />
      )}
      
      <Image
        rounded={'lg'}
        height={230}
        width={282}
        objectFit={'cover'}
        src={src}
        alt={alt}
        className={className}
        onLoadingComplete={() => setIsLoading(false)}
        style={{
          width: '100%',
          height: '100%',
        }}
        {...props}
      />
    </Box>
  );
}