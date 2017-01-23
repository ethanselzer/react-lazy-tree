function findOrdinalPaths(nodes, childrenPropertyName, predicate, depth, path, paths) {
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const childNodes = node[childrenPropertyName];

        path[depth] = i;

        if (predicate(node)) {
            path.splice(depth + 1);
            paths.push(path.join());
        }

        if (childNodes.length) {
            findOrdinalPaths(childNodes, childrenPropertyName, predicate, depth + 1, path, paths);
        }
    }

    return paths;
}

function find(nodes, predicate, childrenPropertyName) {
    return findOrdinalPaths(nodes, childrenPropertyName, predicate, 0, [], []);
}

function normalizeData(data) {
    if (!Array.isArray(data)) {
        return [data];
    }

    return data;
}

function _mapPathToData(data, childrenPropertyName, path, predicate, depth, currentPath, out) {
    const p = path.split(',').slice(0, depth + 1).join();

    data = normalizeData(data);

    for (let i = 0; i < data.length; i++) {
        const node = data[i];
        const children = node[childrenPropertyName];

        if (!children) {
            throw new Error(`Supplied value for prop \`childrenPropertyName\`, ${childrenPropertyName}, was not found in at least one node of your data!`);
        }

        currentPath[depth] = i;
        const cp = currentPath.slice(0, depth + 1).join();

        if (cp === p) {
            out[depth] = predicate(node);
        }

        if (children.length) {
            _mapPathToData(
                children,
                childrenPropertyName,
                path,
                predicate,
                depth + 1,
                currentPath,
                out
            );
        }
    }

    return out;
}

export function findFirstNode(nodes, predicate, childrenPropertyName) {
    const paths = find(nodes, predicate, childrenPropertyName);
    return paths.length ? paths[0] : '';
}

export function mapPathToData(data, childrenPropertyName, path, predicate) {
    return _mapPathToData(data, childrenPropertyName, path, predicate, 0, [], []);
}
