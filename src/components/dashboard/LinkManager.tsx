import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Plus, Save } from "lucide-react";
import TreeView from "./TreeView";
import LinkEditor from "./LinkEditor";

interface LinkData {
  id?: string;
  originalUrl: string;
  shortUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  buttonStyle?: any;
  paymentSettings?: any;
}

interface TreeNodeProps {
  id: string;
  name: string;
  type: "folder" | "link";
  children?: TreeNodeProps[];
  url?: string;
  level?: number;
}

interface LinkManagerProps {
  initialNodes?: TreeNodeProps[];
  onSave?: (data: { nodes: TreeNodeProps[]; currentLink?: LinkData }) => void;
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

const LinkManager: React.FC<LinkManagerProps> = ({
  initialNodes = defaultNodes,
  onSave = () => {},
}) => {
  const [nodes, setNodes] = useState<TreeNodeProps[]>(initialNodes);
  const [selectedNode, setSelectedNode] = useState<TreeNodeProps | null>(null);
  const [currentLinkData, setCurrentLinkData] = useState<LinkData | null>(null);

  // Generate a unique ID for new nodes
  const generateId = () =>
    `node-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  const handleNodeSelect = (node: TreeNodeProps) => {
    setSelectedNode(node);

    if (node.type === "link") {
      // Create link data from the selected node
      setCurrentLinkData({
        id: node.id,
        originalUrl: node.url || "",
        shortUrl: node.id,
        title: node.name,
        description: "",
        isActive: true,
      });
    } else {
      setCurrentLinkData(null);
    }
  };

  const handleNodeAdd = (parentId: string | null, type: "folder" | "link") => {
    const newNode: TreeNodeProps = {
      id: generateId(),
      name: type === "folder" ? "New Folder" : "New Link",
      type: type,
      url: type === "link" ? "https://example.com" : undefined,
      children: type === "folder" ? [] : undefined,
    };

    if (parentId === null) {
      // Add to root level
      setNodes([...nodes, newNode]);
    } else {
      // Add as a child of the specified parent
      const updatedNodes = addNodeToParent(nodes, parentId, newNode);
      setNodes(updatedNodes);
    }

    setSelectedNode(newNode);

    if (type === "link") {
      setCurrentLinkData({
        id: newNode.id,
        originalUrl: newNode.url || "",
        shortUrl: newNode.id,
        title: newNode.name,
        description: "",
        isActive: true,
      });
    } else {
      setCurrentLinkData(null);
    }
  };

  const addNodeToParent = (
    nodeList: TreeNodeProps[],
    parentId: string,
    newNode: TreeNodeProps,
  ): TreeNodeProps[] => {
    return nodeList.map((node) => {
      if (node.id === parentId) {
        return {
          ...node,
          children: [...(node.children || []), newNode],
        };
      } else if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: addNodeToParent(node.children, parentId, newNode),
        };
      }
      return node;
    });
  };

  const handleNodeDelete = (nodeId: string) => {
    const updatedNodes = deleteNode(nodes, nodeId);
    setNodes(updatedNodes);

    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(null);
      setCurrentLinkData(null);
    }
  };

  const deleteNode = (
    nodeList: TreeNodeProps[],
    nodeId: string,
  ): TreeNodeProps[] => {
    return nodeList
      .filter((node) => node.id !== nodeId)
      .map((node) => {
        if (node.children && node.children.length > 0) {
          return {
            ...node,
            children: deleteNode(node.children, nodeId),
          };
        }
        return node;
      });
  };

  const handleNodeDrop = (draggedId: string, targetId: string) => {
    // First find and remove the dragged node
    let draggedNode: TreeNodeProps | null = null;
    const nodesWithoutDragged = removeNodeAndGetIt(nodes, draggedId, (node) => {
      draggedNode = node;
    });

    if (!draggedNode) return;

    // Then add it to the target location
    const updatedNodes = addNodeToParent(
      nodesWithoutDragged,
      targetId,
      draggedNode,
    );
    setNodes(updatedNodes);
  };

  const removeNodeAndGetIt = (
    nodeList: TreeNodeProps[],
    nodeId: string,
    callback: (node: TreeNodeProps) => void,
  ): TreeNodeProps[] => {
    const result: TreeNodeProps[] = [];

    for (const node of nodeList) {
      if (node.id === nodeId) {
        callback(node);
        continue;
      }

      const newNode = { ...node };
      if (node.children && node.children.length > 0) {
        newNode.children = removeNodeAndGetIt(node.children, nodeId, callback);
      }
      result.push(newNode);
    }

    return result;
  };

  const handleLinkSave = (data: LinkData) => {
    if (!selectedNode || selectedNode.type !== "link") return;

    // Update the node with new data
    const updatedNodes = updateNodeData(nodes, selectedNode.id, {
      name: data.title,
      url: data.originalUrl,
    });

    setNodes(updatedNodes);

    // Update the selected node reference
    const updatedNode = {
      ...selectedNode,
      name: data.title,
      url: data.originalUrl,
    };
    setSelectedNode(updatedNode);

    // Save the full data
    onSave({ nodes: updatedNodes, currentLink: data });
  };

  const updateNodeData = (
    nodeList: TreeNodeProps[],
    nodeId: string,
    updates: Partial<TreeNodeProps>,
  ): TreeNodeProps[] => {
    return nodeList.map((node) => {
      if (node.id === nodeId) {
        return { ...node, ...updates };
      } else if (node.children && node.children.length > 0) {
        return {
          ...node,
          children: updateNodeData(node.children, nodeId, updates),
        };
      }
      return node;
    });
  };

  const handleSaveAll = () => {
    onSave({ nodes, currentLink: currentLinkData || undefined });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      <div className="flex justify-between items-center p-4 bg-white border-b">
        <h2 className="text-2xl font-bold">Link Manager</h2>
        <Button onClick={handleSaveAll} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save All Changes
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden p-4 gap-4">
        <div className="w-1/3 h-full overflow-hidden">
          <TreeView
            nodes={nodes}
            onNodeSelect={handleNodeSelect}
            onNodeAdd={handleNodeAdd}
            onNodeDelete={handleNodeDelete}
            onNodeDrop={handleNodeDrop}
            selectedNodeId={selectedNode?.id}
          />
        </div>

        <Separator orientation="vertical" />

        <div className="w-2/3 h-full overflow-auto">
          {currentLinkData ? (
            <LinkEditor linkData={currentLinkData} onSave={handleLinkSave} />
          ) : selectedNode && selectedNode.type === "folder" ? (
            <Card className="w-full h-full flex flex-col items-center justify-center p-8 bg-white">
              <h3 className="text-xl font-medium mb-4">{selectedNode.name}</h3>
              <p className="text-gray-500 mb-6 text-center">
                This is a folder. You can add links or other folders inside it.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleNodeAdd(selectedNode.id, "folder")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Folder
                </Button>
                <Button
                  onClick={() => handleNodeAdd(selectedNode.id, "link")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="w-full h-full flex flex-col items-center justify-center p-8 bg-white">
              <h3 className="text-xl font-medium mb-4">No Link Selected</h3>
              <p className="text-gray-500 mb-6 text-center">
                Select a link from the tree structure on the left to edit its
                properties, or create a new link to get started.
              </p>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleNodeAdd(null, "folder")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Folder
                </Button>
                <Button
                  onClick={() => handleNodeAdd(null, "link")}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Link
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default LinkManager;
