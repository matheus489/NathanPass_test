"use client";

import { useEffect, useState } from "react";
import {
  Input,
  Select,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@nathanpass/ui";
import { Search, BookOpen, Clock, ArrowRight, Book, Video, Headphones, FileText } from "lucide-react";
import { api } from "@/services/api";

const CATEGORIES = [
  { value: "all", label: "Todos", icon: Book },
  { value: "articles", label: "Artigos", icon: FileText },
  { value: "videos", label: "Vídeos", icon: Video },
  { value: "podcasts", label: "Podcasts", icon: Headphones },
];

export function ContentLibrary() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchContents() {
      setLoading(true);
      try {
        const data = await api.get('/wellness/content');
        setContents(data);
      } catch (err) {
        // Pode exibir erro se desejar
      } finally {
        setLoading(false);
      }
    }
    fetchContents();
  }, []);

  const filteredContents = contents.filter((content) => {
    const matchesCategory = selectedCategory === "all" || content.category === selectedCategory;
    const matchesSearch = content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryIcon = (category) => {
    const categoryInfo = CATEGORIES.find((c) => c.value === category);
    return categoryInfo?.icon || Book;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4 pointer-events-none" />
          <Input
            placeholder="Buscar conteúdo..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-background/50 backdrop-blur-sm"
          />
        </div>
        <Select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value)}
          className="w-full sm:w-[200px] bg-background/50 backdrop-blur-sm"
        >
          {CATEGORIES.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </Select>
      </div>
      {/* Grid de cards */}
      <div className="w-full grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContents.map((content) => {
          const CategoryIcon = getCategoryIcon(content.category);
          return (
            <Card key={content.id} className="group hover:shadow-lg transition-shadow duration-200 w-full h-full flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <CategoryIcon className="w-4 h-4 text-primary" />
                  </div>
                  <CardTitle className="group-hover:text-primary transition-colors truncate break-words">
                    {content.title}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2 break-words">
                  {content.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  {content.duration}
                </div>
              </CardContent>
              <CardFooter>
                <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                  Ler mais
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
      {filteredContents.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium">Nenhum conteúdo encontrado</h3>
          <p className="text-muted-foreground mt-1">
            Tente ajustar sua busca ou selecionar outra categoria
          </p>
        </div>
      )}
    </div>
  );
} 