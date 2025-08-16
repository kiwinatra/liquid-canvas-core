#!/bin/bash

# Цвета для оформления
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Функция для отображения меню
show_menu() {
  clear
  echo -e "${YELLOW}╔════════════════════════════╗"
  echo -e "║       ${BLUE}Git Updater${YELLOW}          ║"
  echo -e "╠════════════════════════════╣"
  echo -e "║ ${GREEN}1) Push Changes${YELLOW}          ║"
  echo -e "║ ${RED}2) Exit${YELLOW}                     ║"
  echo -e "╚════════════════════════════╝${NC}"
  echo -n "Выберите вариант [1-2]: "
}

# Функция для push изменений
push_changes() {
  echo -e "\n${BLUE}Введите описание изменений:${NC}"
  read -r commit_msg
  
  echo -e "\n${YELLOW}Выполняю команды:${NC}"
  echo -e "${GREEN}git add .${NC}"
  git add .
  
  echo -e "${GREEN}git commit -m \"$commit_msg\"${NC}"
  git commit -m "$commit_msg"
  
  echo -e "${GREEN}git push origin main${NC}"
  git push origin main
  
  echo -e "\n${GREEN}✓ Изменения успешно отправлены!${NC}"
  read -n 1 -s -r -p "Нажмите любую клавишу чтобы продолжить..."
}

# Основной цикл программы
while true; do
  show_menu
  read -r choice
  
  case $choice in
    1)
      push_changes
      ;;
    2)
      echo -e "\n${RED}Выход из программы...${NC}"
      exit 0
      ;;
    *)
      echo -e "\n${RED}Неверный выбор! Попробуйте снова.${NC}"
      sleep 1
      ;;
  esac
done 