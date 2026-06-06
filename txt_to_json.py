import random
import json

width = 800;
height = 600;

def clean_vertex(vertices, i):
    #print(vertices, i)
    u = vertices[i].strip()
    u = u[1:-1]
    return u

def add_node(u, nodes_to_id, id_to_nodes, cur_id):
    if u not in nodes_to_id:
        nodes_to_id[u] = cur_id
        id_to_nodes[cur_id] = u
        return cur_id + 1
    return cur_id

def convert_txt_to_json(fname):
    f = open(fname, "r")
    content = f.read()
    lines = content.split("\n")
    edges = []
    for line in lines:
        if len(line)!=0:
            #print(line)
            vertices = line.split("--")
            u = clean_vertex(vertices, 0)
            v = clean_vertex(vertices, 1)
            #print(u, v)
            edges.append([u, v])
    print("Number of edges:", len(edges))
    nodes_to_id = dict()
    id_to_nodes = dict()
    cur_id = 0
    for edge in edges:
        u, v = edge
        cur_id = add_node(u, nodes_to_id, id_to_nodes, cur_id)
        cur_id = add_node(v, nodes_to_id, id_to_nodes, cur_id)
    print(len(nodes_to_id), len(id_to_nodes))
    nodes = []
    for u in nodes_to_id:
        nodes.append({"id": nodes_to_id[u], "x": random.random()*width, "y": random.random()*height})
    links = []
    for edge in edges:
        u, v = edge
        links.append({"source": nodes_to_id[u], "target": nodes_to_id[v]})
    #print(links)
    with open("nodes.js", "w") as file:
        json_string = json.dumps(nodes)
        file.write("nodes = " + json_string)
    with open("links.js", "w") as file:
        json_string = json.dumps(links)
        file.write("links = " + json_string)
    f.close()

def main():
    fname = input("Enter file name:")
    convert_txt_to_json(fname)

main()