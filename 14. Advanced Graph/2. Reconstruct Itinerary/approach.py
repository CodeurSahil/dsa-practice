class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        graph = {src: [] for src, dst in tickets}

        for src, dest in sorted(tickets, reverse=True):
            graph[src].append(dest)

        itinerary = []

        def dfs(src):
            if src in graph:
                while graph[src]:
                    dest = graph[src].pop()
                    dfs(dest)
            
            itinerary.append(src)

        dfs('JFK');

        return itinerary[::-1]
    


# Failed
class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        graph = {}

        for src, dest in tickets:
            if src not in graph:
                graph[src] = []

            graph[src].append(dest)

            if (len(graph[src]) > 1):
                for i in range(len(graph[src]) - 1, 0, -1):
                    if self.lexical_ordering(graph[src][i], graph[src][i - 1]):
                        graph[src][i], graph[src][i - 1] = graph[src][i - 1], graph[src][i]

        itinerary = []
        itinerarySet = set()

        def dfs(src):
            itinerary.append(src)

            if src in graph:
                for dest in graph[src]:
                    key = f'{src}-{dest}'

                    if key not in itinerarySet:
                        itinerarySet.add(key)
                        dfs(dest)

        dfs('JFK');

        return itinerary

    def lexical_ordering(self, s1, s2):
        print(s1, s2)
        for a, b in zip(s1, s2):
            if a == b:
                continue
            else:
                return (a < b)


        class Solution:
    def findItinerary(self, tickets: List[List[str]]) -> List[str]:
        graph = {src: [] for src, dst in tickets}

        tickets.sort()

        for src, dest in tickets:
            graph[src].append(dest)

        itinerary = ['JFK']

        def dfs(src):
            if len(itinerary) == len(tickets) + 1:
                return True

            if src not in graph:
                return False

            tmp = list(graph[src])

            for i, v in enumerate(tmp):
                graph[src].pop(i)
                itinerary.append(v)

                if dfs(v): return True

                graph[src].insert(i, v)
                itinerary.pop()

            return False

        dfs('JFK');

        return itinerary