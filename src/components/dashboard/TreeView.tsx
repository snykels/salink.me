import React, { useState } from "react";
import { cn } from "@/lib/utils";
import {
  ChevronRight,
  ChevronDown,
  Folder,
  Link,
  MoreVertical,
  Plus,
  Trash,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TreeNodeProps {
  id: string;
  name: string;
  type: "folder" | "link";
  children?: TreeNodeProps[];
  url?: string;
  level?: number;
}

interface TreeViewProps {
  nodes?: TreeNodeProps[];
  onNodeSelect?: (node: TreeNodeProps) => void;
  onNodeAdd?: (parentId: string | null, type: "folder" | "link") => void;
  onNodeDelete?: (nodeId: string) => void;
  onNodeDrop?: (draggedId: string, targetId: string) => void;
  selectedNodeId?: string;
}

const defaultNodes: TreeNodeProps[] = [
  {
    id: "1",
    name: "Marketing Links",
    type: "folder",
    children: [
      {
        id: "2",
        name: "Social Media",
        type: "folder",
        children: [
          {
            id: "3",
            name: "Instagram Campaign",
            type: "link",
            url: "https://example.com/instagram",
          },
          {
            id: "4",
            name: "Twitter Posts",
            type: "link",
            url: "https://example.com/twitter",
          },
        ],
      },
      {
        id: "5",
        name: "Email Newsletter",
        type: "link",
        url: "https://example.com/newsletter",
      },
    ],
  },
  {
    id: "6",
    name: "Product Links",
    type: "folder",
    children: [
      {
        id: "7",
        name: "New Features",
        type: "link",
        url: "https://example.com/features",
      },
    ],
  },
  {
    id: "8",
    name: "Personal Bio Link",
    type: "link",
    url: "https://example.com/bio",
  },
];

const TreeNode: React.FC<{
  node: TreeNodeProps;
  onSelect: (node: TreeNodeProps) => void;
  onAdd: (parentId: string, type: "folder" | "link") => void;
  onDelete: (nodeId: string) => void;
  onDragStart: (e: React.DragEvent, nodeId: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, nodeId: string) => void;
  isSelected: boolean;
  level: number;
}> = ({
  node,
  onSelect,
  onAdd,
  onDelete,
  onDragStart,
  onDragOver,
  onDrop,
  isSelected,
  level = 0,
}) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div
        className={cn(
          "flex items-center py-1 px-2 rounded-md cursor-pointer group",
          isSelected ? "bg-primary/10" : "hover:bg-muted",
        )}
        style={{ paddingLeft: `${level * 12 + 8}px` }}
        onClick={() => onSelect(node)}
        draggable
        onDragStart={(e) => onDragStart(e, node.id)}
        onDragOver={onDragOver}
        onDrop={(e) => onDrop(e, node.id)}
      >
        {node.type === "folder" && (
          <button
            className="mr-1 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
          >
            {expanded ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </button>
        )}
        {node.type === "folder" ? (
          <Folder className="h-4 w-4 mr-2 text-blue-500" />
        ) : (
          <Link className="h-4 w-4 mr-2 text-green-500" />
        )}
        <span className="flex-grow truncate">{node.name}</span>
        <div className="opacity-0 group-hover:opacity-100 flex items-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(node.id, "link");
                  }}
                >
                  <Plus className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Add new item</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {node.type === "folder" && (
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd(node.id, "folder");
                  }}
                >
                  Add Folder
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onAdd(node.id, "link");
                }}
              >
                Add Link
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(node.id);
                }}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {hasChildren && expanded && (
        <div className="ml-2">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              onAdd={onAdd}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDragOver={onDragOver}
              onDrop={onDrop}
              isSelected={isSelected}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView: React.FC<TreeViewProps> = ({
  nodes = defaultNodes,
  onNodeSelect = () => {},
  onNodeAdd = () => {},
  onNodeDelete = () => {},
  onNodeDrop = () => {},
  selectedNodeId = "",
}) => {
  const [draggedNodeId, setDraggedNodeId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, nodeId: string) => {
    setDraggedNodeId(nodeId);
    e.dataTransfer.setData("text/plain", nodeId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, targetNodeId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData("text/plain");
    if (draggedId && draggedId !== targetNodeId) {
      onNodeDrop(draggedId, targetNodeId);
    }
    setDraggedNodeId(null);
  };

  return (
    <Card className="h-full bg-white overflow-auto p-2">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-lg font-medium">Link Structure</h3>
        <div className="flex space-x-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNodeAdd(null, "folder")}
                >
                  <Folder className="h-4 w-4 mr-1" />
                  New Folder
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new folder at root level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onNodeAdd(null, "link")}
                >
                  <Link className="h-4 w-4 mr-1" />
                  New Link
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new link at root level</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="space-y-0.5">
        {nodes.map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            onSelect={onNodeSelect}
            onAdd={onNodeAdd}
            onDelete={onNodeDelete}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            isSelected={node.id === selectedNodeId}
            level={0}
          />
        ))}
      </div>

      {nodes.length === 0 && (
        <div className="flex flex-col items-center justify-center h-40 text-center text-muted-foreground">
          <Folder className="h-12 w-12 mb-2 opacity-20" />
          <p>No links or folders yet</p>
          <p className="text-sm">
            Create your first link or folder to get started
          </p>
        </div>
      )}
    </Card>
  );
};

export default TreeView;
