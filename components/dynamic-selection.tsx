import React from 'react'
import RemoveButton from './remove-btn';
import { Button } from './ui/button';
import { DynamicSectionProps } from '@/lib/types';

const DynamicSection = <T,>({ items, onAdd, onRemove, children }: DynamicSectionProps<T>) => (
    <div className="space-y-4">
        {items.map((_, index) => (
            <div key={index} className="space-y-2">
                {children(index)}
                <RemoveButton onClick={() => onRemove(index)} />
            </div>
        ))}
        <Button type="button" onClick={onAdd}>
            Add
        </Button>
    </div>
);

export default DynamicSection