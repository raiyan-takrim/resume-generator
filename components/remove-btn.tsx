import React from 'react'
import { Button } from './ui/button';
import { RemoveButtonProps } from '@/lib/types';

const RemoveButton: React.FC<RemoveButtonProps> = ({ onClick }) => (
    <Button type="button" onClick={onClick} variant="destructive">
        Remove
    </Button>
);

export default RemoveButton